using APIBackend.DataModel;
using APIBackend.Mapper;
using APIBackend.Models;
using APIBackEnd.Data;
using APIBackEnd.Data.Enum;
using APIBackEnd.Mapper;
using APIBackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace APIBackend.Repository
{
    public interface IBillRepository
    {
        public BillModel AddBill(BillModel bill);
    }
    
    public class BillRepository : IBillRepository
    {
        private readonly CoreContext _coreContext;
        private readonly IBillMapper _billMapper;
        private readonly IProductMapper _productMapper;

        public BillRepository(CoreContext _context, IBillMapper billMapper, IProductMapper productMapper)
        {
            _coreContext = _context;
            _billMapper = billMapper;
            _productMapper = productMapper;
        }
        public BillModel AddBill(BillModel bill)
        {
            Bill efObject = new Bill();
            _billMapper.ToEntity(efObject, bill);
            _coreContext.Bill.Add(efObject);
            _coreContext.SaveChanges();
            return _billMapper.ToModel(efObject);
        }

    }
}
