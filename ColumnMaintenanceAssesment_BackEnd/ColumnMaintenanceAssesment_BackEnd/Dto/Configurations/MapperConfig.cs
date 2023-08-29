using AutoMapper;
using ColumnMaintenanceAssesment_BackEnd.Models;

namespace ColumnMaintenanceAssesment_BackEnd.Dto.Configurations
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            CreateMap<Aotable, TableNamesWithIdDto>().ReverseMap();

        }
    }
}
