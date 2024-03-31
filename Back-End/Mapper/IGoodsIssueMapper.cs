using TestAPI.Data;
using TestAPI.Models;

namespace TestAPI.Mapper
{
    public interface IGoodsIssueMapper
    {
        public GoodsIssueModel ToModel(GoodsIssue efObject);
        public List<GoodsIssueModel> ToModels(List<GoodsIssue> efObject);
    }
}
