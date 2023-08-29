using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ColumnMaintenanceAssesment_BackEnd.Models;

public partial class Aocolumn
{
    public Aocolumn(Guid id, Guid? tableId, string name, string type, string? description, string? dataType, int? dataSize, int? dataScale, string? comment, int? encrypted, string? distortion, Aotable? table)
    {
        Id = id;
        TableId = tableId;
        Name = name;
        Type = type;
        Description = description;
        DataType = dataType;
        DataSize = dataSize;
        DataScale = dataScale;
        Comment = comment;
        Encrypted = encrypted;
        Distortion = distortion;
        Table = table;
    }

    public Aocolumn()
    {
    }

    public Guid Id { get; set; }

    public Guid? TableId { get; set; }

    public string Name { get; set; } = null!;

    public string Type { get; set; } = null!;

    public string? Description { get; set; }

    public string? DataType { get; set; }

    public int? DataSize { get; set; }

    public int? DataScale { get; set; }

    public string? Comment { get; set; }

    public int? Encrypted { get; set; }

    public string? Distortion { get; set; }

    [JsonIgnore]
    public virtual Aotable? Table { get; set; }
}
