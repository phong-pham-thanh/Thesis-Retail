using APIBackend.Mapper;
using APIBackend.Models;
using APIBackend.Repository;
using APIBackEnd.Data;
using APIBackEnd.Repository;

namespace APIBackend.Service
{
    public interface IInventoryService
    {
        public List<InventoryModel> GetAllInventory();
        public List<InventoryModel> GetInventoryByWarehouseId(int idWareHouse);
    }
    public class InventoryService : IInventoryService
    {
        private readonly IInventoryRepository _inventoryRepository;

        public InventoryService(IInventoryRepository inventoryRepository)
        {
            _inventoryRepository = inventoryRepository;
        }

        public List<InventoryModel> GetAllInventory()
        {
            return _inventoryRepository.GetAllInventory();
        }
        public List<InventoryModel> GetInventoryByWarehouseId(int idWareHouse)
        {
            return _inventoryRepository.GetInventoryByWarehouseId(idWareHouse);
        }
    }
}
