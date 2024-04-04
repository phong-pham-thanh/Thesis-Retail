using APIBackEnd.Data;
using APIBackend.Models;

namespace APIBackend.Repository
{
    public interface IGoodReciptRepository
    {
        public bool AddGoodRecipt(GoodsReceiptModel goodsReceiptModel, List<GoodReceiptDetailModel> listGoodReceiptDetailModels, int idWareHouse);
    }
}
