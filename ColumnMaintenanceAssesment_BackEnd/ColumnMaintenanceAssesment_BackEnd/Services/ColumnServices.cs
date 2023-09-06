using ColumnMaintenanceAssesment_BackEnd.Models;
using ColumnMaintenanceAssesment_BackEnd.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ColumnMaintenanceAssesment_BackEnd.Services
{
    public class ColumnServices : ColumnInterface
    {

        private readonly ColumnMaintenanceDbContext dbContext;

        public ColumnServices(ColumnMaintenanceDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Aocolumn> AddColumn(Aocolumn column)
        {
            await dbContext.Aocolumns.AddAsync(column);
            await dbContext.SaveChangesAsync();
            return column;
        }

        public async Task<bool> DeleteColumn(Guid id)
        {
            var column = await dbContext.Aocolumns.FindAsync(id);
            if (column != null)
            {
                dbContext.Aocolumns.Remove(column);
                await dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<bool> EditColumn(Guid id, Aocolumn column)
        {
            var ColumnDetails = await dbContext.Aocolumns.SingleOrDefaultAsync(option => option.Id == id);
            if (ColumnDetails != null)
            {
                if (id != ColumnDetails.Id)
                {
                    return false;
                }

                if (column.TableId != null || column.TableId== Guid.Empty)
                {
                    ColumnDetails.TableId = column.TableId;
                }
                if (!string.IsNullOrWhiteSpace(column.Name))
                {
                    ColumnDetails.Name = column.Name;
                }

                if (!string.IsNullOrWhiteSpace(column.Description))
                {
                    ColumnDetails.Description = column.Description;
                }

                if (!string.IsNullOrWhiteSpace(column.DataType))
                {
                    ColumnDetails.DataType = column.DataType;
                }

                if (!string.IsNullOrWhiteSpace(column.Name))
                {
                    ColumnDetails.Name = column.Name;
                }

                if (column.DataSize != null)
                {
                    ColumnDetails.DataSize = column.DataSize;
                }

                if (column.DataScale != null)
                {
                    ColumnDetails.DataScale = column.DataScale;
                }


                if ( column.Encrypted!=null )
                {
                    ColumnDetails.Encrypted = column.Encrypted;
                }
              
                ColumnDetails.Distortion = column.Distortion;
                ColumnDetails.Comment = column.Comment;

                await dbContext.SaveChangesAsync();
                return true;
            }
            else { return false; }
        }
    }
}
