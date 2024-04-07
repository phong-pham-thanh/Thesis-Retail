using APIBackEnd.Data;
using APIBackend.Mapper;
using APIBackEnd.Mapper;
using APIBackEnd.Migrations;
using Microsoft.EntityFrameworkCore;
using APIBackend.DataModel;

namespace APIBackend.Repository
{
    public interface IGoodReciptDetailRepository
    {
        public bool AddGoodReciptDetails(GoodReceiptDetails goodReceiptDetails);
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
    }
}
