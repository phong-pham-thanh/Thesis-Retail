using APIBackEnd.Data;
using APIBackend.Mapper;
using APIBackEnd.Mapper;
using APIBackEnd.Migrations;
using Microsoft.EntityFrameworkCore;
using APIBackend.DataModel;
using APIBackend.Models;

namespace APIBackend.Repository
{
    public interface IGoodReciptDetailRepository
    {
        public bool AddGoodReciptDetails(GoodReceiptDetails goodReceiptDetails);
        public GoodReceiptDetailModel UpdateGoodReceiptDetails(int id, GoodReceiptDetailModel updateItem);
    }
    public class GoodReciptDetailRepository : IGoodReciptDetailRepository
    {
        private readonly CoreContext _coreContext;
        private readonly IGoodReciptDetailMapper _goodReciptDetailMapper;
        public GoodReciptDetailRepository(CoreContext _context, IGoodReciptDetailMapper goodReciptDetailMapper) 
        {
            _coreContext = _context;
            _goodReciptDetailMapper = goodReciptDetailMapper;
        }
        public bool AddGoodReciptDetails(GoodReceiptDetails goodReceiptDetails)
        {
            _coreContext.GoodReceiptDetails.Add(goodReceiptDetails);
            _coreContext.SaveChanges();
            return true;
        }

        public GoodReceiptDetailModel UpdateGoodReceiptDetails(int id, GoodReceiptDetailModel updateItem)
        {
            GoodReceiptDetails efObject = _coreContext.GoodReceiptDetails.Where(g => g.Id == id).FirstOrDefault();
            if (efObject == null)
            {
                throw new ArgumentException("Good Receipt Details not found");
            }
            _goodReciptDetailMapper.ToEntity(efObject, updateItem);
            _coreContext.SaveChanges();
            return _goodReciptDetailMapper.ToModel(efObject);
        }

    }
}
