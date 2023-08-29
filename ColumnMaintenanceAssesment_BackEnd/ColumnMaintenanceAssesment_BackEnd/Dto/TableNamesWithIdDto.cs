namespace ColumnMaintenanceAssesment_BackEnd.Dto
{
    public class TableNamesWithIdDto
    {
        public TableNamesWithIdDto()
        {
        }

        public TableNamesWithIdDto(Guid id, string name)
        {
            Id = id;
            Name = name;
        }
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
    }
}
