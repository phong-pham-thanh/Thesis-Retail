using TestAPI.Data;
using TestAPI.Models;

namespace TestAPI.Repository
{
    public interface IGIssueRepository
    {
        public List<GoodsIssueModel> GetAllGoodsIssue();
    }
}
