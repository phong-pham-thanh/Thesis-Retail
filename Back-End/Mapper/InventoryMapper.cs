using APIBackEnd.Data;
using APIBackend.Models;
using APIBackend.DataModel;

namespace APIBackend.Mapper
{
    public interface IInventoryMapper
    {
        public InventoryModel ToModel(Inventories efObject);
        public List<InventoryModel> ToModels(List<Inventories> efObjects);

    }
    public class InventoryMapper : IInventoryMapper
    {
        public InventoryModel ToModel(Inventories efObject)
        {
            if (efObject == null)
            {
                return null;
            }
            InventoryModel modelObject = new InventoryModel();
            modelObject.Id = efObject.Id;
            modelObject.ProductId = efObject.ProductId;
            modelObject.WareHouseId = efObject.WareHouseId;
            modelObject.Quantity = efObject.Quantity;
            return modelObject;
        }

        public List<InventoryModel> ToModels(List<Inventories> efObjects)
        {
            List<InventoryModel> result = new List<InventoryModel>();
            foreach (Inventories efObject in efObjects)
            {
                InventoryModel modelObject = new InventoryModel();
                modelObject.Id = efObject.Id;
                modelObject.ProductId = efObject.ProductId;
                modelObject.WareHouseId = efObject.WareHouseId;
                modelObject.Quantity = efObject.Quantity;
                result.Add(modelObject);
            }
            return result;
        }
    }
}
