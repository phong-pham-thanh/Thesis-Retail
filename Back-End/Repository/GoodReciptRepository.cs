using APIBackend.DataModel;
using APIBackend.DataModel.Analyse;
using APIBackend.Mapper;
using APIBackend.Models;
using APIBackEnd.Data;
using APIBackEnd.Data.Enum;
using APIBackEnd.Mapper;
using Microsoft.EntityFrameworkCore;

namespace APIBackend.Repository
{
    public interface IGoodReciptRepository
    {
        public GoodsReceipt AddGoodRecipt(GoodsReceipt goodsReceip);
        public List<GoodsReceiptModel> GetAllGoodRecipts();
        public GoodsReceiptModel GetGoodReciptById(int id);
        public GoodsReceiptModel AcceptGoodRecipt(int id);
        public GoodsReceiptModel CancelGoodRecipt(int id);
        public GoodsReceiptModel UpdateGoodReceipt(int id, GoodsReceiptModel updateItem);
        public List<GoodsReceiptModel> GetAllGoodReciptsByDate(DateParam dateParam);
        public bool RemoveGoodReceipt(int id);
    }
    public class GoodsReciptRepository : IGoodReciptRepository
    {
        private readonly CoreContext _coreContext;
        private readonly IProductMapper _productMapper;
        private readonly IGoodsReceiptMapper _goodReciptMapper;
        private readonly IGoodReciptDetailMapper _goodReciptDetailMapper;

        public GoodsReciptRepository(CoreContext _context, IProductMapper productMapper, IGoodsReceiptMapper goodReciptMapper, IGoodReciptDetailMapper goodReciptDetailMapper)
        {
            _coreContext = _context;
            _productMapper = productMapper;
            _goodReciptMapper = goodReciptMapper;
            _goodReciptDetailMapper = goodReciptDetailMapper;
        }

        public GoodsReceipt AddGoodRecipt(GoodsReceipt goodsReceipt)
        {
            _coreContext.GoodsReceipt.Add(goodsReceipt);
            _coreContext.SaveChanges();
            return goodsReceipt;
        }

        public List<GoodsReceiptModel> GetAllGoodRecipts()
        {
            List<GoodsReceiptModel> listGoodRecipt = new List<GoodsReceiptModel>();
            listGoodRecipt = _goodReciptMapper.ToModels(_coreContext.GoodsReceipt
                                                        .Include(go => go.ListGoodReciptDetails)
                                                        .Include(go => go.Partner)
                                                        .ToList());
            return listGoodRecipt;
        }
        public GoodsReceiptModel GetGoodReciptById(int id)
        {
            GoodsReceipt goodsReceipt = _coreContext.GoodsReceipt.Where(g => g.Id == id)
                                                                .Include(go => go.ListGoodReciptDetails)
                                                                .Include(go => go.Partner)
                                                                .FirstOrDefault();
            return _goodReciptMapper.ToModel(goodsReceipt);
        }

        public GoodsReceiptModel AcceptGoodRecipt(int id)
        {
            GoodsReceipt efObject = _coreContext.GoodsReceipt.Where(x => x.Id == id).Include(x => x.ListGoodReciptDetails).FirstOrDefault();

            if(efObject == null)
            {
                throw new ArgumentException("Good Receipt not found");
            }
            efObject.ReceiptStatus = Status.Success;
            _coreContext.SaveChanges();

            return _goodReciptMapper.ToModel(efObject);
        }

        public GoodsReceiptModel CancelGoodRecipt(int id)
        {
            GoodsReceipt efObject = _coreContext.GoodsReceipt.Where(x => x.Id == id).Include(x => x.ListGoodReciptDetails).FirstOrDefault();

            if(efObject == null)
            {
                throw new ArgumentException("Good Receipt not found");
            }
            efObject.ReceiptStatus = Status.Canceled;
            _coreContext.SaveChanges();

            return _goodReciptMapper.ToModel(efObject);
        }


        public GoodsReceiptModel UpdateGoodReceipt(int id, GoodsReceiptModel updateItem)
        {
            GoodsReceipt efObject = _coreContext.GoodsReceipt.Where(g => g.Id == id).FirstOrDefault();
            if(efObject == null)
            {
                throw new ArgumentException("Good Receipt not found");
            }
            _goodReciptMapper.ToEntity(efObject, updateItem);
            _coreContext.SaveChanges();
            return _goodReciptMapper.ToModel(efObject);
        }

        public List<GoodsReceiptModel> GetAllGoodReciptsByDate(DateParam dateParam)
        {
            List<GoodsReceiptModel> listGoodRecipt = new List<GoodsReceiptModel>();
            listGoodRecipt = _goodReciptMapper.ToModels(_coreContext.GoodsReceipt
                                                        .Where(re => re.ImportDate >= dateParam.StartDate && re.ImportDate <= dateParam.EndDate)
                                                        .Include(go => go.ListGoodReciptDetails)
                                                        .Include(go => go.Partner)
                                                        .ToList());
            return listGoodRecipt;
        }

        public bool RemoveGoodReceipt(int id)
        {
            var item = _coreContext.GoodsReceipt.FirstOrDefault(x => x.Id == id);
            if(item == null)
            {
                throw new ArgumentException("Good Receipt not found");
            }
            _coreContext.GoodsReceipt.Remove(item);
            _coreContext.SaveChanges();

            return true;
        }
    }

}
