using PoliChallenge.Business.HiScores;
using PoliChallenge.Business.Places;
using PoliChallenge.Business.Questions;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace PoliChallenge.Business._Core
{
    public class Context : DbContext
    {
        private sealed class MigrationConfiguration : DbMigrationsConfiguration<Context>
        {
            public MigrationConfiguration() => AutomaticMigrationsEnabled = true;
        }

        public Context() : base("PoliCL") => Database.SetInitializer(new DropCreateDatabaseIfModelChanges<Context>());

        public Context(string connectionStringName) : base(connectionStringName) => Database.SetInitializer(new MigrateDatabaseToLatestVersion<Context,MigrationConfiguration>());

        public DbSet<Question> Questions { get; set; }

        public DbSet<Place> Places { get; set; }

        public DbSet<HiScore> HiScores { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<DecimalPropertyConvention>();
            modelBuilder.Conventions.Add(new DecimalPropertyConvention(38, 18));
        }
    }
}