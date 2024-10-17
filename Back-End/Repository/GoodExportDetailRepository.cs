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
    public interface IGoodExportDetailRepository
    {
        public bool AddGoodExportDetails(GoodExportDetails goodExportDetails);
        public GoodExportDetailModel UpdateGoodExportDetails(int id, GoodExportDetailModel updateItem);
    }
    public class GoodExportDetailRepository : IGoodExportDetailRepository
    {
        private readonly CoreContext _coreContext;
        private readonly IGoodExportDetailMapper _goodExportDetailMapper;
        public GoodExportDetailRepository(CoreContext _context, IGoodExportDetailMapper goodExportDetailMapper) 
        {
            _coreContext = _context;
            _goodExportDetailMapper = goodExportDetailMapper;
        }
        public bool AddGoodExportDetails(GoodExportDetails efObject)
        {
            _coreContext.GoodExportDetails.Add(efObject);
            _coreContext.SaveChanges();
            return true;
        }

        public GoodExportDetailModel UpdateGoodExportDetails(int id, GoodExportDetailModel updateItem)
        {
            GoodExportDetails efObject = _coreContext.GoodExportDetails.Where(g => g.Id == id).FirstOrDefault();
            if (efObject == null)
            {
                throw new ArgumentException("Good Export Details not found");
            }
            _goodExportDetailMapper.ToEntity(efObject, updateItem);
            _coreContext.SaveChanges();
            return _goodExportDetailMapper.ToModel(efObject);
        }

    }
}
