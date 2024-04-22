const { ObjectId } = require("mongodb");
class DocgiaService{
    constructor(client){
        this.Docgia=client.db().collection("docgia");

    }
    extractDocgiaData(payload) {
        const docgia = {
          madocgia:payload.madocgia,
          holot:payload.holot,
          ten:payload.ten,
          ngaysinh:payload.ngaysinh,
          phai:payload.phai,
          diachi:payload.diachi,
          dienthoai:payload.dienthoai,
        };
        Object.keys(docgia).forEach(
            (key) => docgia [key] === undefined && delete docgia [key]
          );
          return docgia;
         }
        async create(payload) {
            const docgia = this.extractDocgiaData(payload);
            const result = await this.Docgia.findOneAndUpdate(
            docgia,
              { $set: docgia },
              { returnDocument: "after", upsert: true }
            );
            // console.log(result);
            return result;
          }
        async find(filter) {
            const cursor = await this.Docgia.find(filter);
            return await cursor.toArray();
          }
        
          async findByName(name) {
            return await this.find({
              ten: { $regex: new RegExp(name), $options: "i" },
            });
          }
        
          async findById(id) {
            return await this.Docgia.findOne({
              _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
            });
          }
        
          async update(id, payload) {
            const filter = {
              _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
            };
            const update = this.extractDocgiaData(payload);
            const result = await this.Docgia.findOneAndUpdate(
              filter,
              { $set: update },
              { returnDocument: "after" }
            );
            return result;
          }
        
          async delete(id) {
            const result = await this.Docgia.findOneAndDelete({
              _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
            });
            return result;
          }
        
          async deleteAll() {
            const result = await this.Docgia.deleteMany({});
            return result.deletedCount;
          }
}
module.exports = DocgiaService;