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
        public bool AddListGoodExportDetails(List<GoodExportDetailModel> listGoodExportDetailModels);
        public bool DeleteListGoodExportDetailByGoodExportId(int exportId);
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

        public bool AddListGoodExportDetails(List<GoodExportDetailModel> listGoodExportDetailModels)
        {

            foreach (var item in listGoodExportDetailModels)
            {
                GoodExportDetails efObject = new GoodExportDetails();
                _goodExportDetailMapper.ToEntity(efObject, item);
                _coreContext.GoodExportDetails.Add(efObject);
            }
            _coreContext.SaveChanges();
            return true;
        }


        public bool DeleteListGoodExportDetailByGoodExportId(int exportId)
        {
            List<GoodExportDetails> listGoodExportDetails = _coreContext.GoodExportDetails.Where(x => x.GoodExportId == exportId).ToList();
            foreach (GoodExportDetails efObject in listGoodExportDetails)
            {
                _coreContext.GoodExportDetails.Remove(efObject);
            }
            _coreContext.SaveChanges();
            return true;
        }
    }
}
