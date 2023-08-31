using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ColumnMaintenanceAssesment_BackEnd.Models;

public partial class Aotable
{
    public Aotable(Guid id, string name, string type, string? description, string? comment, int? history, int? boundary, int? log, int? cache, int? notify, int? identifier, ICollection<Aocolumn> aocolumns)
    {
        Id = id;
        Name = name;
        Type = type;
        Description = description;
        Comment = comment;
        History = history;
        Boundary = boundary;
        Log = log;
        Cache = cache;
        Notify = notify;
        Identifier = identifier;
        Aocolumns = aocolumns;
    }

    public Aotable()
    {
    }

    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string Type { get; set; } = null!;

    public string? Description { get; set; }

    public string? Comment { get; set; }

    public int? History { get; set; }

    public int? Boundary { get; set; }

    public int? Log { get; set; }

    public int? Cache { get; set; }

    public int? Notify { get; set; }

    public int? Identifier { get; set; }

    public virtual ICollection<Aocolumn> Aocolumns { get; set; }
}
