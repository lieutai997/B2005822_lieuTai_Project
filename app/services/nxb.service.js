const { ObjectId } = require("mongodb");

class NxbService{
    constructor(client) {
        this.Nxb = client.db().collection("nhaxuatban");

}
extractNxbData(payload) {
    const nhaxuatban = {
      
      manxb: payload.manxb,
      tennxb: payload.tennxb,
      diachi: payload.diachi,
      
    };
    
    Object.keys(nhaxuatban).forEach(
    (key) => nhaxuatban [key] === undefined && delete nhaxuatban[key]
  );
  return nhaxuatban;
}
async create(payload) {
    const nhaxuatban = this.extractNxbData(payload);
    const result = await this.Nxb.findOneAndUpdate(
      nhaxuatban,
      { $set:  nhaxuatban },
      { returnDocument: "after", upsert: true }
    );
    // console.log(result);
    return result;
  }
async find(filter) {
    const cursor = await this.Nxb.find(filter);
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      tennxb: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    return await this.Nxb.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractNxbData(payload);
    const result = await this.Nxb.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result;
  }

  async delete(id) {
    const result = await this.Nxb.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async deleteAll() {
    const result = await this.Nxb.deleteMany({});
    return result.deletedCount;
  }


}
module.exports = NxbService;