using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using System.Text.Json.Nodes;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalHost4200", policy => {
        policy.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod();
        
    });
});
var app = builder.Build();
app.UseCors("AllowLocalHost4200");
app.MapGet("/api", (string?name) =>
{
    var response = new
    {
        message = string.IsNullOrEmpty(name) ? "Name not found" : $"Hello my name is {name}"
    };
    return Results.Json(response);
});

app.MapGet("/api/nasa", static async () =>
{
    var url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";
    var httpClient = new HttpClient();
    var response = await httpClient.GetAsync(url);
    var content = response.Content;
    var result = await content.ReadAsStringAsync();
    var obj = System.Text.Json.JsonDocument.Parse(result);
    var hdurl = obj.RootElement.GetProperty("hdurl");
    //object JsonConvert = null;
    //var root = JsonConvert.DeserializeObject(result);
    //var items = root.SelectToken("responseHeader").Children().OfType<JProperty>().ToDictionary(p => p.Name, p => p.Value);
    
    return Results.Json(hdurl);
});

app.Run();
