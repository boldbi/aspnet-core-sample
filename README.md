# BoldBI Embedding ASP.NET Core Samples

This sample demonstrates the dashboard rendering with the list of dashboards available in your Bold BI server.

This section guides you in using the Bold BI dashboard in your ASP.NET core sample application.

 * [Requirements to run the demo](#requirements-to-run-the-demo)
 * [Using the ASP.NET Core sample](#using-the-asp.net-core-samples)
 * [Online Demos](#online-demos)
 * [Documentation](#documentation)

 ## Requirements to run the demo

The samples require the following requirements to run.

 * [.NET Core 6.0](https://dotnet.microsoft.com/download/dotnet-core)
 * [Visual Studio Code](https://code.visualstudio.com/download)

 ## Using the ASP.NET Core sample
 
 * Open the ASP.NET Core sample in Visual Studio Code.

 * Download the embedConfig.json file by referring to this [help documentation](https://help.boldbi.com/cloud-bi/site-administration/embed-settings/). Ensure that the Embed Authentication button is activated on the Embed Settings page.

 * Copy the downloaded embedConfig.json file and place it into the following [location](https://github.com/boldbi/aspnet-core-sample/tree/master/BoldBI.Embed.Sample/BoldBI.Embed.Sample) of the application. Please refer to the below image.
![EmbedConfig Image](https://user-images.githubusercontent.com/91586758/236446545-8fee653c-4239-49c3-87a1-7d2477681aac.png)
 
 * The following properties are used in `embedConfig.json` file:

    <meta charset="utf-8"/>
    <table>
    <tbody>
        <tr>
            <td align="left">ServerUrl</td>
            <td align="left">Dashboard Server URL (Eg: http://localhost:5000/bi, http://demo.boldbi.com/bi).</td>
        </tr>
        <tr>
            <td align="left">EmbedSecret</td>
            <td align="left">Get your EmbedSecret key from the Embed tab by enabling the `Enable embed authentication` on the Administration page https://help.boldbi.com/embedded-bi/site-administration/embed-settings/.</td>
        </tr>
        <tr>
            <td align="left">SiteIdentifier</td>
            <td align="left">For the Bold BI Enterprise edition, it should be like `site/site1`. For Bold BI Cloud, it should be an empty string.</td>
        </tr>
        <tr>
            <td align="left">Environment</td>
            <td align="left">Your Bold BI application environment. (If Cloud, you should use `cloud,` if Enterprise, you should use `enterprise`).</td>
        </tr>
        <tr>
            <td align="left">UserEmail</td>
            <td align="left">UserEmail of the Admin in your Bold BI, which would be used to get the dashboard list.</td>
        </tr>
        <tr>
            <td align="left">DashboardId</td>
            <td align="left">Item id of the dashboard to be embedded in your application.</td>
        </tr>
        <tr>
            <td align="left">EmbedType</td>
            <td align="left">BoldBI.EmbedType.Component.</td>
        </tr>
        <tr>
            <td align="left">ExpirationTime</td>
            <td align="left">Token expiration time.</td>
        </tr>
    </tbody>
    </table>

 * You can restore the required dependencies by executing the following command in the terminal: `dotnet restore`.

 * You can build your .NET project by executing the `dotnet build` command in the terminal.

 * Run the application using the command `dotnet run`.

Please refer to the [help documentation](https://help.boldbi.com/embedded-bi/javascript-based/samples/v3.3.40-or-later/asp-net-core/#how-to-run-the-sample) to know how to run the sample.

## Online Demos

Look at the Bold BI Embedding sample to live demo [here](https://samples.boldbi.com/embed).


## Documentation

A complete Bold BI Embedding documentation can be found on [Bold BI Embedding Help](https://help.boldbi.com/embedded-bi/javascript-based/).