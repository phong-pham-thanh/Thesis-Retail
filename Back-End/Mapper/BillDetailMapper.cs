using APIBackend.DataModel;
using APIBackend.Models;
using APIBackEnd.Data;

namespace APIBackend.Mapper
{
    public interface IBillDetailMapper
    {
        public BillDetailModel ToModel(BillDetails efObject);
        public List<BillDetailModel> ToModels(List<BillDetails> efObjects);
        public void ToEntity(BillDetails efObject, BillDetailModel modelObject);
    }


    public class BillDetailMapper : IBillDetailMapper
    {
        public BillDetailMapper() { }


        public BillDetailModel ToModel(BillDetails efObject)
        {
            if (efObject == null)
            {
                return null;
            }
            BillDetailModel modelObject = new BillDetailModel();
            modelObject.Id = efObject.Id;
            modelObject.ProductId = efObject.ProductId;
            modelObject.BillId = efObject.BillId;
            modelObject.Quantity = efObject.Quantity;
            modelObject.PriceUnit = efObject.PriceUnit;
            return modelObject;
        }

        public List<BillDetailModel> ToModels(List<BillDetails> efObjects)
        {
            if(efObjects == null || efObjects.Count == 0)
            {
                return null;
            }
            List<BillDetailModel> result = new List<BillDetailModel>();
            foreach (BillDetails item in efObjects)
            {
                BillDetailModel modelObject = new BillDetailModel();
                modelObject.Id = item.Id;
                modelObject.ProductId = item.ProductId;
                modelObject.BillId = item.BillId;
                modelObject.Quantity = item.Quantity;
                modelObject.PriceUnit = item.PriceUnit;
                result.Add(modelObject);
            }
            return result;
        }

        public void ToEntity(BillDetails efObject, BillDetailModel modelObject)
        {
            if (modelObject == null) return;

            efObject.Id = modelObject.Id;
            efObject.ProductId = modelObject.ProductId;
            efObject.BillId = modelObject.BillId;
            efObject.Quantity = modelObject.Quantity;
            efObject.PriceUnit = modelObject.PriceUnit;
            return;
        }
    }




}