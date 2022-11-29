const model = require("../model/index");
const { Op } = require("sequelize");
const controller = {};
const moment = require("moment");

controller.returnBook = async (req, res) => {
  try {
    const codeDetailBooking = req.body.code_book + req.body.code_member;
    const endDate = await model.detailBookings.findAll({
      where: {
        code_detail_bookings: codeDetailBooking,
      },
    });
    const d1 = new Date(endDate[0].end_date);
    const d2 = new Date();
    if (d1.getTime() >= d2.getTime()) {
      await model.detailBookings.destroy({
        where: {
          code_detail_bookings: codeDetailBooking,
          qty: req.body.qty,
        },
      });
      await model.members.decrement(
        {
          total_booking: req.body.qty,
        },
        {
          where: {
            code_member: req.body.code_member,
          },
        }
      );
      await model.books.increment(
        {
          stock: req.body.qty,
        },
        {
          where: {
            code_book: req.body.code_book,
          },
        }
      );
      res.json({
        status: 200,
        message: "Berhasil Mengembalikan Buku Tepat Waktu!",
      });
    } else {
      await model.detailBookings.destroy({
        where: {
          code_detail_bookings: codeDetailBooking,
          qty: req.body.qty,
        },
      });
      await model.members.decrement(
        {
          total_booking: req.body.qty,
        },
        {
          where: {
            code_member: req.body.code_member,
          },
        }
      );
      await model.books.increment(
        {
          stock: req.body.qty,
        },
        {
          where: {
            code_book: req.body.code_book,
          },
        }
      );
      await model.members.update(
        {
          valid: false,
          end_penalty: moment().add(3, "day"),
        },
        {
          where: {
            code_member: req.body.code_member,
          },
        }
      );
      res.json({
        status: 200,
        message: "Pengembalian Buku terlambat , tidak dapat meminjam buku selama 3 hari !",
      });
    }
  } catch (error) {
    res.json({
      status: 400,
      message: error.message,
    });
  }
};
controller.borrowBook = async (req, res) => {
  try {
    let book = await model.books.findAll({
      where: {
        code_book: req.body.code_book,
      },
    });
    console.log(book);
    const valid = await model.members.findAll({
      where: {
        code_member: req.body.code_member,
      },
    });
    const d1 = new Date();
    const d2 = new Date(valid[0].end_penalty);
    if (d1.getTime() >= d2.getTime()) {
      await model.members.update(
        {
          valid: true,
          end_penalty: "",
        },
        {
          where: {
            code_member: req.body.code_member,
          },
        }
      );
    } else if (!valid[0].valid) {
      res.json({
        status: 200,
        message: "Member Sedang dalam Masa Penalty selama 3 Hari , Harap Hubungi Admin",
      });
    } else if (!book[0].stock >= 1) {
      res.json({
        status: 200,
        message: "Stock Buku Kosong silahkan pilih buku lain yang tersedia",
      });
    } else if (valid[0].total_booking == 2) {
      res.json({
        status: 200,
        message: "Melebihi batas peminjaman buku , Harap Hubungi Admin",
      });
    } else {
      console.log(book[0].title);
      const detailBookingCode = req.body.code_book + req.body.code_member;
      const bookingCode = "B0" + req.body.code_member;
      const detailBooking = await model.detailBookings.create({
        code_detail_bookings: detailBookingCode,
        code_booking: bookingCode,
        code_book: req.body.code_book,
        book_name: book[0].title,
        code_member: req.body.code_member,
        qty: req.body.qty,
        end_date: moment().add(7, "day"),
      });
      await model.members.update(
        {
          code_booking: bookingCode,
        },
        {
          where: {
            code_member: req.body.code_member,
          },
        }
      );
      await model.members.increment(
        {
          total_booking: req.body.qty,
        },
        {
          where: {
            code_member: req.body.code_member,
          },
        }
      );
      await model.books.decrement(
        {
          stock: req.body.qty,
        },
        {
          where: {
            code_book: req.body.code_book,
          },
        }
      );
      res.json({
        status: 200,
        message: "Berhasil Meminjam Buku !",
        data: detailBooking,
      });
    }
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
};
controller.inputBook = async (req, res) => {
  try {
    const [books, created] = await model.books.findOrCreate({
      where: {
        code: req.body.code,
      },
      defaults: {
        code: req.body.code,
        title: req.body.title,
        author: req.body.author,
        stock: req.body.stock,
      },
    });
    if (!created) {
      res.json({
        status: 200,
        message: "Kode Buku Tidak Boleh sama !",
      });
    } else {
      res.json({
        status: 200,
        message: "Berhasil Menambahkan Buku !",
        data: books,
      });
    }
  } catch (error) {
    res.json({
      status: 400,
      message: error.message,
    });
  }
};
controller.checkBooking = async (req, res) => {
  try {
    const checkBooking = model.detailBookings.findAll();
    if (checkBooking.length > 0) {
      res.json({
        status: 200,
        message: "List Buku yang sedang dipinjam",
        data: checkBooking,
      });
    } else {
      res.json({
        status: 200,
        message: "Tidak ada Peminjaman Buku hari ini",
      });
    }
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
};
controller.listAllBook = async (req, res) => {
  try {
    const book = await model.books.findAll();
    if (book.length > 0) {
      res.json({
        status: 200,
        message: "Berhasil mendapatkan List Buku",
        data: book,
      });
    } else {
      res.json({
        status: 200,
        message: "List Buku gagal di dapatkan",
      });
    }
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
};
controller.checkBook = async (req, res) => {
  try {
    const book = await model.books.findAll({
      where: {
        stock: { [Op.gte]: 1 },
      },
    });
    if (book.length > 0) {
      res.json({
        status: 200,
        message: "Berhasil mendapatkan List yang tersedia",
        data: book,
      });
    } else {
      res.json({
        status: 200,
        message: "List Buku yang tersedia gagal di dapatkan",
      });
    }
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
};

module.exports = controller;
