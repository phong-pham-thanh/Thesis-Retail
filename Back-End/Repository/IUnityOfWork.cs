using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NGO.Core.Repositories
{
    public interface IUnityOfWork : IDisposable
    {
        void Commit();
    }
}
