﻿using APIBackEnd.Data;
using APIBackEnd.Models;

namespace APIBackEnd.Repository
{
    public interface IGReceiptRepository
    {
        public List<GoodsReceiptModel> GetAllGoodsReceipt();
    }
}
