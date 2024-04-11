using APIBackend.DataModel;
using APIBackEnd.Data;
using APIBackEnd.Mapper;

namespace APIBackend.Repository
{
    public interface IInventoryRepository
    {
        public bool UpdateInventory(int idProduct, int Quantity, int idWareHouse);
    }
    public class InventoryRepository : IInventoryRepository
    {
        private readonly CoreContext _coreContext;
        public InventoryRepository(CoreContext _context) 
        {
            _coreContext = _context;
        }
        public bool UpdateInventory(int idProduct, int Quantity, int idWareHouse)
        {
            Inventories inventory = _coreContext.Inventories.Where(iv => iv.WareHouseId == idWareHouse && iv.ProductId == idProduct).FirstOrDefault();
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
            _coreContext.SaveChanges();
            return true;
        }
    }
}
