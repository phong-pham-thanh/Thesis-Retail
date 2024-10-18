using APIBackEnd.Data;
using APIBackend.Mapper;
using APIBackEnd.Mapper;
using APIBackEnd.Migrations;
using Microsoft.EntityFrameworkCore;
using APIBackend.DataModel;
using APIBackend.Models;
using APIBackEnd.Models;

namespace APIBackend.Repository
{
    public interface IGoodTransferDetailRepository
    {
        public bool AddGoodTransferDetails(GoodTransferDetails goodTransferDetails);
        public GoodTransferDetailModel UpdateGoodTransferDetails(int id, GoodTransferDetailModel updateItem);
    }
    public class GoodTransferDetailRepository : IGoodTransferDetailRepository
    {
        private readonly CoreContext _coreContext;
        private readonly IGoodTransferDetailMapper _goodTransferDetailMapper;
        public GoodTransferDetailRepository(CoreContext _context, IGoodTransferDetailMapper goodTransferDetailMapper) 
        {
            _coreContext = _context;
            _goodTransferDetailMapper = goodTransferDetailMapper;
        }
        public bool AddGoodTransferDetails(GoodTransferDetails efObject)
        {
            _coreContext.GoodTransferDetails.Add(efObject);
            _coreContext.SaveChanges();
            return true;
        }

        public GoodTransferDetailModel UpdateGoodTransferDetails(int id, GoodTransferDetailModel updateItem)
        {
            GoodTransferDetails efObject = _coreContext.GoodTransferDetails.Where(g => g.Id == id).FirstOrDefault();
            if (efObject == null)
            {
                throw new ArgumentException("Good Transfer Details not found");
            }
            _goodTransferDetailMapper.ToEntity(efObject, updateItem);
            _coreContext.SaveChanges();
            return _goodTransferDetailMapper.ToModel(efObject);
        }
    }
}
