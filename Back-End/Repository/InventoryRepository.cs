using APIBackend.DataModel;
using APIBackend.Mapper;
using APIBackend.Models;
using APIBackEnd.Data;
using APIBackEnd.Mapper;

namespace APIBackend.Repository
{
    public interface IInventoryRepository
    {
        public bool UpdateInventory(int idProduct, int Quantity, int idWareHouse, bool isImport);
        public List<InventoryModel> GetInventoriesByProductId(int idProduct);
    }
    public class InventoryRepository : IInventoryRepository
    {
        private readonly CoreContext _coreContext;
        private readonly IInventoryMapper _inventoryMapper;
        public InventoryRepository(CoreContext _context, IInventoryMapper inventoryMapper) 
        {
            _coreContext = _context;
            _inventoryMapper = inventoryMapper;
        }
        public bool UpdateInventory(int idProduct, int Quantity, int idWareHouse, bool isImport)
        {
            Inventories inventory = _coreContext.Inventories.Where(iv => iv.WareHouseId == idWareHouse && iv.ProductId == idProduct).FirstOrDefault();
            if(isImport)
            {
                if (inventory == null) 
                {
                    Inventories newInventory = new Inventories();
                    newInventory.ProductId = idProduct;
                    newInventory.WareHouseId = idWareHouse;
                    newInventory.Quantity = Quantity;
                    _coreContext.Inventories.Add(newInventory);
                }
                else
                {
                    inventory.Quantity += Quantity;
                }
            }
            else
            {
                if (inventory == null) 
                {
                    Inventories newInventory = new Inventories();
                    newInventory.ProductId = idProduct;
                    newInventory.WareHouseId = idWareHouse;
                    newInventory.Quantity = -Quantity;
                    _coreContext.Inventories.Add(newInventory);
                }
                else
                {
                    inventory.Quantity -= Quantity;
                }
            }
            _coreContext.SaveChanges();
            return true;
        }

        public List<InventoryModel> GetInventoriesByProductId(int idProduct)
        {
            return _inventoryMapper.ToModels(_coreContext.Inventories.Where(i => i.ProductId == idProduct).ToList());
        }
    }
}
