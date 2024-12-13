using APIBackend.DataModel;
using APIBackEnd.Data.Enum;
using APIBackEnd.Data;
using APIBackend.Mapper;
using APIBackEnd.Mapper;
using APIBackEnd.Models;
using Microsoft.EntityFrameworkCore;
using APIBackend.Models;

namespace APIBackend.Repository
{
    public interface IGoodTransferRepository
    {
        public GoodsTransfer AddGoodTransfer(GoodsTransfer goodsTransfer);
        public List<GoodsTransferModel> GetAllGoodTransfers();
        public GoodsTransferModel GetGoodTransferById(int id);
        public GoodsTransferModel AcceptGoodTransfer(int id, int acceptedById);
        public GoodsTransferModel UpdateGoodTransfer(int id, GoodsTransferModel updateItem);
        public GoodsTransferModel CancelGoodTransfer(int id, int acceptedById);
        public bool RemoveGoodTransfer(int id);
    }
    public class GoodTransferRepository : IGoodTransferRepository
    {
        private readonly CoreContext _coreContext;
        private readonly IProductMapper _productMapper;
        private readonly IGoodsTransferMapper _goodTransferMapper;
        private readonly IGoodTransferDetailMapper _goodTransferDetailMapper;

        public GoodTransferRepository(CoreContext _context, IProductMapper productMapper, IGoodsTransferMapper goodTransferMapper, IGoodTransferDetailMapper goodTransferDetailMapper)
        {
            _coreContext = _context;
            _productMapper = productMapper;
            _goodTransferMapper = goodTransferMapper;
            _goodTransferDetailMapper = goodTransferDetailMapper;
        }

        public GoodsTransfer AddGoodTransfer(GoodsTransfer goodsTransfer)
        {
            _coreContext.GoodsTransfers.Add(goodsTransfer);
            _coreContext.SaveChanges();
            return goodsTransfer;
        }

        public GoodsTransferModel GetGoodTransferById(int id)
        {
            return _goodTransferMapper.ToModel(_coreContext.GoodsTransfers
                                            .Include(go => go.FromWareHouse)
                                            .Include(go => go.ToWareHouse)
                                            .Include(go => go.AcceptedBy)
                                            .Include(go => go.ListGoodTransferDetails)
                                            .Where(go => go.Id == id).FirstOrDefault());
        }

        public List<GoodsTransferModel> GetAllGoodTransfers()
        {
            List<GoodsTransfer> listGoodTransfers = new List<GoodsTransfer>();
            listGoodTransfers = _coreContext.GoodsTransfers
                                            .Include(go => go.FromWareHouse)
                                            .Include(go => go.ToWareHouse)
                                            .Include(go => go.AcceptedBy)
                                            .Include(go => go.ListGoodTransferDetails)
                                            .ToList();
            return _goodTransferMapper.ToModels(listGoodTransfers);
        }

        public GoodsTransferModel AcceptGoodTransfer(int id, int acceptedById)
        {
            GoodsTransfer efObject = _coreContext.GoodsTransfers.Where(x => x.Id == id).Include(x => x.ListGoodTransferDetails).FirstOrDefault();

            if (efObject == null)
            {
                throw new ArgumentException("Good Transfer not found");
            }
            efObject.AcceptedById = acceptedById;
            efObject.Status = Status.Success;
            _coreContext.SaveChanges();

            return _goodTransferMapper.ToModel(efObject);
        }

        public GoodsTransferModel UpdateGoodTransfer(int id, GoodsTransferModel updateItem)
        {
            GoodsTransfer efObject = _coreContext.GoodsTransfers.Where(g => g.Id == id).FirstOrDefault();
            if (efObject == null)
            {
                throw new ArgumentException("Good Transfer not found");
            }
            _goodTransferMapper.ToEntity(efObject, updateItem);
            _coreContext.SaveChanges();
            return _goodTransferMapper.ToModel(efObject);
        }

        public GoodsTransferModel CancelGoodTransfer(int id, int acceptedById)
        {
            GoodsTransfer efObject = _coreContext.GoodsTransfers.Where(x => x.Id == id).Include(x => x.ListGoodTransferDetails).FirstOrDefault();

            if (efObject == null)
            {
                throw new ArgumentException("Good Transfer not found");
            }
            efObject.Status = Status.Canceled;
            efObject.AcceptedById = acceptedById;
            _coreContext.SaveChanges();

            return _goodTransferMapper.ToModel(efObject);
        }

        public bool RemoveGoodTransfer(int id)
        {
            var item = _coreContext.GoodsTransfers.FirstOrDefault(x => x.Id == id);
            if(item == null)
            {
                throw new ArgumentException("Good Transfer not found");
            }
            _coreContext.GoodsTransfers.Remove(item);
            _coreContext.SaveChanges();

            return true;
        }
    }
}
