using ColumnMaintenanceAssesment_BackEnd.Dto;
using ColumnMaintenanceAssesment_BackEnd.Models;

namespace ColumnMaintenanceAssesment_BackEnd.Services.Interfaces
{
    public interface TableInterface
    {
        public Task<List<TableNamesWithIdDto>> GetTableNames();
        public Task<IEnumerable<Aotable>> GetColumnByTable(Guid id);
    }
}
