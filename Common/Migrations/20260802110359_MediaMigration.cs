using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Common.Migrations
{
    /// <inheritdoc />
    public partial class MediaMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Header",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ThumbNailPath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Logo = table.Column<byte[]>(type: "varbinary(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Header", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tag",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EpisodeId = table.Column<int>(type: "int", nullable: false),
                    PictureId = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tag", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Season",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HeaderId = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Season", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Season_Header_HeaderId",
                        column: x => x.HeaderId,
                        principalTable: "Header",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Episode",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SeasonId = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VideoPath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EpisodeSign = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Episode", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Episode_Season_SeasonId",
                        column: x => x.SeasonId,
                        principalTable: "Season",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EpisodeTags",
                columns: table => new
                {
                    EpisodesId = table.Column<int>(type: "int", nullable: false),
                    TagsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EpisodeTags", x => new { x.EpisodesId, x.TagsId });
                    table.ForeignKey(
                        name: "FK_EpisodeTags_Episode_EpisodesId",
                        column: x => x.EpisodesId,
                        principalTable: "Episode",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EpisodeTags_Tag_TagsId",
                        column: x => x.TagsId,
                        principalTable: "Tag",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Picture",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EpisodeId = table.Column<int>(type: "int", nullable: false),
                    ImagePath = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Picture", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Picture_Episode_EpisodeId",
                        column: x => x.EpisodeId,
                        principalTable: "Episode",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PictureTags",
                columns: table => new
                {
                    PicturesId = table.Column<int>(type: "int", nullable: false),
                    TagsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PictureTags", x => new { x.PicturesId, x.TagsId });
                    table.ForeignKey(
                        name: "FK_PictureTags_Picture_PicturesId",
                        column: x => x.PicturesId,
                        principalTable: "Picture",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PictureTags_Tag_TagsId",
                        column: x => x.TagsId,
                        principalTable: "Tag",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Header",
                columns: new[] { "Id", "Logo", "ThumbNailPath", "Title" },
                values: new object[] { 1, null, "default/images/closeup-open-textbook.jpg", "Show Title" });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "Email", "Password", "Role" },
                values: new object[,]
                {
                    { -2, "dummy@archive.com", "dummy", "User" },
                    { -1, "admin@archive.com", "1234", "Admin" }
                });

            migrationBuilder.InsertData(
                table: "Season",
                columns: new[] { "Id", "HeaderId", "Title" },
                values: new object[,]
                {
                    { 1, 1, "Season I" },
                    { 2, 1, "Season II" }
                });

            migrationBuilder.InsertData(
                table: "Episode",
                columns: new[] { "Id", "Description", "EpisodeSign", "SeasonId", "Title", "VideoPath" },
                values: new object[,]
                {
                    { 1, "The Description", "S1E1", 1, "MyEpisode", "default/videos/LifeOfBrian.mp4" },
                    { 2, "The Description", "S1E2", 1, "MyEpisode2", "default/videos/LifeOfBrian.mp4" },
                    { 3, "The other description", "S2E1", 2, "New Episode", "default/videos/LifeOfBrian.mp4" }
                });

            migrationBuilder.InsertData(
                table: "Picture",
                columns: new[] { "Id", "EpisodeId", "ImagePath" },
                values: new object[,]
                {
                    { 1, 1, "default/images/closeup-open-textbook.jpg" },
                    { 2, 1, "default/images/open-page.jpg" },
                    { 3, 1, "default/images/open-page-2.jpg" },
                    { 4, 2, "default/images/closeup-open-textbook.jpg" },
                    { 5, 2, "default/images/open-page.jpg" },
                    { 6, 3, "default/images/closeup-open-textbook.jpg" },
                    { 7, 3, "default/images/open-page.jpg" },
                    { 8, 3, "default/images/open-page-2.jpg" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Episode_SeasonId",
                table: "Episode",
                column: "SeasonId");

            migrationBuilder.CreateIndex(
                name: "IX_EpisodeTags_TagsId",
                table: "EpisodeTags",
                column: "TagsId");

            migrationBuilder.CreateIndex(
                name: "IX_Picture_EpisodeId",
                table: "Picture",
                column: "EpisodeId");

            migrationBuilder.CreateIndex(
                name: "IX_PictureTags_TagsId",
                table: "PictureTags",
                column: "TagsId");

            migrationBuilder.CreateIndex(
                name: "IX_Season_HeaderId",
                table: "Season",
                column: "HeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_User_Email",
                table: "User",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EpisodeTags");

            migrationBuilder.DropTable(
                name: "PictureTags");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Picture");

            migrationBuilder.DropTable(
                name: "Tag");

            migrationBuilder.DropTable(
                name: "Episode");

            migrationBuilder.DropTable(
                name: "Season");

            migrationBuilder.DropTable(
                name: "Header");
        }
    }
}
