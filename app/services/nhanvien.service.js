const { ObjectId } = require("mongodb");

class NhanvienService {
  constructor(client) {
    this.Nhanvien = client.db().collection("nhan");
  }

  extractNhanvienData(payload) {
    const nhanvien = {
      msnv: payload.msnv,
      hotennv: payload.hotennv,
      password: payload.password,
      chucvu: payload.chucvu,
      diachi: payload.diachi,
      sodienthoai: payload.sodienthoai,

    };

    Object.keys(nhanvien).forEach(
      (key) => nhanvien[key] === undefined && delete nhanvien[key]
    );
    return nhanvien;
  }

  async create(payload) {
    const nhanvien = this.extractNhanvienData(payload);
    const result = await this.Nhanvien.findOneAndUpdate(
      nhanvien,
      { $set: nhanvien },
      { returnDocument: "after", upsert: true }
    );
    // console.log(result);
    return result;
  }

  async find(filter) {
    const cursor = await this.Nhanvien.find(filter);
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      hotennv: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    return await this.Nhanvien.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractNhanvienData(payload);
    const result = await this.Nhanvien.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result;
  }

  async delete(id) {
    const result = await this.Nhanvien.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async deleteAll() {
    const result = await this.Nhanvien.deleteMany({});
    return result.deletedCount;
  }

  async findFavorite() {
    return await this.find({ favorite: true });
  }
}
module.exports = NhanvienService;



