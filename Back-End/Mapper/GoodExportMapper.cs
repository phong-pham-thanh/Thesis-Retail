using APIBackend.DataModel;
using APIBackend.Mapper;
using APIBackEnd.Data;
using APIBackEnd.Models;

namespace APIBackEnd.Mapper
{
    public interface IGoodsExportMapper
    {
        public GoodsExportModel? ToModel(GoodsExport efObject);
        public List<GoodsExportModel> ToModels(List<GoodsExport> efObject);
        public void ToEntity(GoodsExport efObject, GoodsExportModel modelObject);
    }
    public class GoodsExportMapper : IGoodsExportMapper
    {
        private readonly IGoodExportDetailMapper _goodExportDetailMapper;
        private readonly ICustomerMapper _customerMapper;
        public GoodsExportMapper(IGoodExportDetailMapper goodExportDetailMapper, ICustomerMapper customerMapper) 
        {
            _goodExportDetailMapper = goodExportDetailMapper;
            _customerMapper = customerMapper;
        }
        public GoodsExportModel? ToModel(GoodsExport efObject)
        {
            if (efObject == null)
            {
                return null;
            }
            GoodsExportModel modelObject = new GoodsExportModel();
            modelObject.Id = efObject.Id;
            modelObject.CustomerId = efObject.CustomerId;
            modelObject.Customer = _customerMapper.ToModel(efObject.Customer);
            modelObject.ExportStatus = efObject.ExportStatus;
            modelObject.ExportDate = efObject.ExportDate;
            modelObject.ListGoodExportDetailsModel = _goodExportDetailMapper.ToModels(efObject.ListGoodExportDetails);
            return modelObject;
        }

        public List<GoodsExportModel> ToModels(List<GoodsExport> efObjects)
        {
            List<GoodsExportModel> result = new List<GoodsExportModel>();
            foreach (GoodsExport item in efObjects)
            {
                GoodsExportModel modelObject = new GoodsExportModel();
                modelObject.Id = item.Id;
                modelObject.CustomerId = item.CustomerId;
                modelObject.ExportStatus = item.ExportStatus;
                modelObject.ExportDate = item.ExportDate;
                modelObject.Customer = _customerMapper.ToModel(item.Customer);
                modelObject.ListGoodExportDetailsModel = _goodExportDetailMapper.ToModels(item.ListGoodExportDetails);
                result.Add(modelObject);
            }
            return result;
        }

        public void ToEntity(GoodsExport efObject, GoodsExportModel modelObject)
        {
            if (modelObject == null)
            {
                return;
            }
            efObject.Id = modelObject.Id;
            efObject.CustomerId = modelObject.CustomerId;
            efObject.ExportStatus = modelObject.ExportStatus;
            efObject.ExportDate = modelObject.ExportDate;
            return;
        }
    }
}
