using Common.Database.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System.Reflection.Metadata;

namespace Common.Database
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer("_connectionString");
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Header>().HasKey(q => q.Id);
            modelBuilder.Entity<Header>()
                .HasMany(e => e.Seasons)
                .WithOne(e => e.Header)
                .HasForeignKey(e => e.HeaderId)
                .IsRequired();

            modelBuilder.Entity<Season>().HasKey(q => q.Id);
            modelBuilder.Entity<Season>()
                .HasMany(e => e.Episodes)
                .WithOne(e => e.Season)
                .HasForeignKey(e => e.SeasonId)
                .IsRequired();

            modelBuilder.Entity<Episode>().HasKey(q => q.Id);
            modelBuilder.Entity<Episode>()
                .HasMany(e => e.Pictures)
                .WithOne(e => e.Episode)
                .HasForeignKey(e => e.EpisodeId)
                .IsRequired();

            modelBuilder.Entity<Tag>().HasKey(q => q.Id);

            // Episode <-> Tag
            modelBuilder.Entity<Episode>()
                .HasMany(e => e.Tags)
                .WithMany(t => t.Episodes)
                .UsingEntity(j => j.ToTable("EpisodeTags"));

            // Picture <-> Tag
            modelBuilder.Entity<Picture>()
                .HasMany(p => p.Tags)
                .WithMany(t => t.Pictures)
                .UsingEntity(j => j.ToTable("PictureTags"));
        }
    }

    public class DesignContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder.UseSqlServer("Server=localhost,1433;Database=MediaArchive;User Id=sa;Password=Password123!;TrustServerCertificate=True;");

            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}
