namespace PoliChallenge.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.HiScores",
                c => new
                    {
                        Key = c.Guid(nullable: false),
                        TeamName = c.String(nullable: false),
                        Score = c.Double(nullable: false),
                        Date = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Key);
            
            CreateTable(
                "dbo.Places",
                c => new
                    {
                        Key = c.Guid(nullable: false),
                        Name = c.String(nullable: false),
                        Latitude = c.Decimal(nullable: false, precision: 38, scale: 18),
                        Longitude = c.Decimal(nullable: false, precision: 38, scale: 18),
                        Observations = c.String(),
                    })
                .PrimaryKey(t => t.Key);
            
            CreateTable(
                "dbo.Questions",
                c => new
                    {
                        Key = c.Guid(nullable: false),
                        For = c.Guid(nullable: false),
                        Statement = c.String(),
                        Answer1 = c.String(nullable: false),
                        Answer2 = c.String(nullable: false),
                        Answer3 = c.String(nullable: false),
                        CorrectAnswer = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Key);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Questions");
            DropTable("dbo.Places");
            DropTable("dbo.HiScores");
        }
    }
}
