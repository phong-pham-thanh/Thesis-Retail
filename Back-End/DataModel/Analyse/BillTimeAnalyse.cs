namespace APIBackend.DataModel.Analyse
{
    public class BillMonthAnalyse
    {
        public int Month { get; set; }
        public int Year { get; set; }
        public int TotalAmount { get; set; }
        public int WareHouseId { get; set; }
        public string WareHouseName { get; set; }
    }

    public class BillQuaterAnalyse
    {
        public string Quater { get; set; }
        public int Year { get; set; }
        public int TotalAmount { get; set; }
        public int WareHouseId { get; set; }
        public string WareHouseName { get; set; }
    }
}
