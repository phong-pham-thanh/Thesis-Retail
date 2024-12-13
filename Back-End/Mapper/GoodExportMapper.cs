using APIBackend.DataModel;
using APIBackend.Mapper;
using APIBackEnd.Data;
using APIBackEnd.Models;

namespace APIBackEnd.Mapper
{
    public interface IGoodsExportMapper
    {
        public GoodsExportModel ToModel(GoodsExport efObject);
        public List<GoodsExportModel> ToModels(List<GoodsExport> efObject);
        public void ToEntity(GoodsExport efObject, GoodsExportModel modelObject);
    }
    public class GoodsExportMapper : IGoodsExportMapper
    {
        private readonly IGoodExportDetailMapper _goodExportDetailMapper;
        private readonly ICustomerMapper _customerMapper;
        private readonly IWareHouseMapper _warehouseMapper;
        private readonly IUserMapper _userMapper;
        public GoodsExportMapper(
            IGoodExportDetailMapper goodExportDetailMapper, 
            ICustomerMapper customerMapper,
            IUserMapper userMapper,
            IWareHouseMapper wareHouseMapper) 
        {
            _goodExportDetailMapper = goodExportDetailMapper;
            _customerMapper = customerMapper;
            _warehouseMapper = wareHouseMapper;
            _userMapper = userMapper;
        }
        public GoodsExportModel ToModel(GoodsExport efObject)
        {
            if (efObject == null)
            {
                return null;
            }
            GoodsExportModel modelObject = new GoodsExportModel();
            modelObject.Id = efObject.Id;
            modelObject.CustomerId = efObject.CustomerId;
            modelObject.WareHouseId = efObject.WareHouseId;
            modelObject.CreatedById = efObject.CreatedById;
            modelObject.AcceptedById = efObject.AcceptedById;
            modelObject.AcceptedBy = _userMapper.ToModel(efObject.AcceptedBy);
            modelObject.CreatedBy = _userMapper.ToModel(efObject.CreatedBy);
            modelObject.Customer = _customerMapper.ToModel(efObject.Customer);
            modelObject.WareHouse = _warehouseMapper.ToModel(efObject.WareHouse);
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
                modelObject.WareHouseId = item.WareHouseId;
                modelObject.ExportStatus = item.ExportStatus;
                modelObject.ExportDate = item.ExportDate;
                modelObject.CreatedById = item.CreatedById;
                modelObject.AcceptedById = item.AcceptedById;
                modelObject.AcceptedBy = _userMapper.ToModel(item.AcceptedBy);
                modelObject.CreatedBy = _userMapper.ToModel(item.CreatedBy);
                modelObject.Customer = _customerMapper.ToModel(item.Customer);
                modelObject.WareHouse = _warehouseMapper.ToModel(item.WareHouse);
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
            efObject.CustomerId = modelObject.CustomerId;
            efObject.WareHouseId = modelObject.WareHouseId;
            efObject.ExportStatus = modelObject.ExportStatus;
            efObject.CreatedById = modelObject.CreatedById;
            efObject.AcceptedById = modelObject.AcceptedById;
            efObject.ExportDate = modelObject.ExportDate;
            return;
        }
    }
}
