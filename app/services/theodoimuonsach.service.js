const { ObjectId } = require("mongodb");
class MuonsachService{
    constructor(client){
        this.Muonsach=client.db().collection("muon");

    }
    extractMuonsachData(payload) {
        const muonsach = {
        madocgia:payload.madocgia,
        masach:payload.masach,
        ngaymuon:payload.ngaymuon,
        ngaytra:payload.ngaytra,
        };
        Object.keys(muonsach).forEach(
            (key) => muonsach [key] === undefined && delete muonsach[key]
          );
          return muonsach;
        }
        async create(payload) {
            const muonsach = this.extractMuonsachData(payload);
            const result = await this.Muonsach.findOneAndUpdate(
              muonsach,
              { $set: muonsach },
              { returnDocument: "after", upsert: true }
            );
            // console.log(result);
            return result;
          }
        async find(filter) {
            const cursor = await this.Muonsach.find(filter);
            return await cursor.toArray();
          }
        
          async findByName(name) {
            return await this.find({
              name: { $regex: new RegExp(name), $options: "i" },
            });
          }
        
          async findById(id) {
            return await this.Muonsach.findOne({
              _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
            });
          }
        
          async update(id, payload) {
            const filter = {
              _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
            };
            const update = this.extractMuonsachData(payload);
            const result = await this.Muonsach.findOneAndUpdate(
              filter,
              { $set: update },
              { returnDocument: "after" }
            );
            return result;
          }
        
          async delete(id) {
            const result = await this.Muonsach.findOneAndDelete({
              _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
            });
            return result;
          }
        
          async deleteAll() {
            const result = await this.Muonsach.deleteMany({});
            return result.deletedCount;
          }
} 
module.exports = MuonsachService;
