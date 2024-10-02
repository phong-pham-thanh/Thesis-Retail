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
    public interface IBillDetailRepository
    {
        public bool AddBillDetails(BillDetails efObject);
    }
    public class BillDetailRepository : IBillDetailRepository
    {
        private readonly CoreContext _coreContext;

        public BillDetailRepository(CoreContext _context) 
        {
            _coreContext = _context;
        }

        public bool AddBillDetails(BillDetails efObject)
        {
            _coreContext.BillDetails.Add(efObject);
            _coreContext.SaveChanges();
            return true;
        }
    }

}