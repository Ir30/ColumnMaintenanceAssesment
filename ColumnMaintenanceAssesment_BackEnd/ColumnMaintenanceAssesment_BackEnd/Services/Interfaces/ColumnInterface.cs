using ColumnMaintenanceAssesment_BackEnd.Models;

namespace ColumnMaintenanceAssesment_BackEnd.Services.Interfaces
{
    public interface ColumnInterface
    {
        public Task<Aocolumn> AddColumn(Aocolumn column);
        public Task<bool> DeleteColumn(Guid id);
        public Task<bool> EditColumn(Guid id, Aocolumn aocolumn);
    }
}
