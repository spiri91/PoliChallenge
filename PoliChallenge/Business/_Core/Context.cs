using PoliChallenge.Business.HiScores;
using PoliChallenge.Business.Places;
using PoliChallenge.Business.Questions;
using System.Data.Entity;
using System.Data.Entity.Migrations;

namespace PoliChallenge.Business._Core
{
    public class Context : DbContext
    {
        private sealed class MigrationConfiguration : DbMigrationsConfiguration<Context>
        {
            public MigrationConfiguration()
            {
                AutomaticMigrationsEnabled = true;
            }
        }

        public Context() : base()
        {
            Database.SetInitializer<Context>(new DropCreateDatabaseAlways<Context>());
        }

        public Context(string connectionStringName) : base(connectionStringName)
        {
            Database.SetInitializer<Context>(new MigrateDatabaseToLatestVersion<Context,MigrationConfiguration>());
        }

        public DbSet<Question> Questions { get; set; }

        public DbSet<Place> Places { get; set; }

        public DbSet<HiScore> HiScores { get; set; }
    }
}