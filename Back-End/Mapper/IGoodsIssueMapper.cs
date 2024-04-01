using APIBackEnd.Data;
using APIBackEnd.Models;

namespace APIBackEnd.Mapper
{
    public interface IGoodsIssueMapper
    {
        public GoodsIssueModel ToModel(GoodsIssue efObject);
        public List<GoodsIssueModel> ToModels(List<GoodsIssue> efObject);
    }
}
