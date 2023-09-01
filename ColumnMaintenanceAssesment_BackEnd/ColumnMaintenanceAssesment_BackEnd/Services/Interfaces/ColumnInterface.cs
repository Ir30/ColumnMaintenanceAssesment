using ColumnMaintenanceAssesment_BackEnd.Models;

namespace ColumnMaintenanceAssesment_BackEnd.Services.Interfaces
{
    public interface ColumnInterface
    {
        public Task<Aocolumn> addColumn(Aocolumn column);
        public Task<Aocolumn> DeleteColumn(Guid id);
        public Task<bool> EditColumn(Guid id, Aocolumn aocolumn);
    }
}
