namespace PartsTrackerApi.Domain;

public class Part
{
    public string PartNumber { get; set; } // Primary Key
    public string Description { get; set; }
    public int QuantityOnHand { get; set; }
    public string LocationCode { get; set; }
    public DateTime LastStockTake { get; set; }
}