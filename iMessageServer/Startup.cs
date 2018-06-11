using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using iMessageServer.Logic;
using iMessageServer.Models.Database;
using Microsoft.EntityFrameworkCore;

namespace iMessageServer
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        private BridgeClient client;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<MessageController>();
            services.AddSingleton<BridgeClient>();
            //services.AddTransient<MessageDBContext, MessageDBContext>();
            services.AddMvc();
            services.AddSignalR();
            services.AddDbContext<MessageDBContext>(options =>
                options.UseSqlite("Data Source=messages.db")
            );
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseSignalR(routes =>
            {
                routes.MapHub<MessageHub>("/hub");
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
                routes.MapRoute(
                    name: "api",
                    template: "api/{action}/{id?}");
            });

            //client = new BridgeClient(app.ApplicationServices);
        }
    }
}
