# BoldBI Embedded Sample in ASP.NET Core

This project was generated with ASP.NET Core CLI version 6.0. This sample demonstrates the dashboard rendering with the list of dashboards available in your Bold BI server.

## Dashboard View

![Dashboard View](https://github.com/boldbi/aspnet-core-sample/assets/91586758/73318269-f8e9-4b49-b597-d82850c60952)

 ## Requirements/Prerequisites

 * [.NET Core 6.0](https://dotnet.microsoft.com/download/dotnet-core)
 * [Visual Studio Code](https://code.visualstudio.com/download)

 ## Help Link:

 * https://help.boldbi.com/embedded-bi/faq/where-can-i-find-the-product-version/

 ## Supported browser
  
  * Google Chrome, Microsoft Edge, Mozilla Firefox, Mac Machine.

 ## Configuration

  * Ensure that you have enabled embed authentication on the embed settings [page](https://help.boldbi.com/embedded-bi/site-administration/embed-settings/#get-embed-configuration-file). If it is not enabled, enable it. Please refer to the below image.
  ![Embed Settings](https://github.com/boldbi/aspnet-core-sample/assets/91586758/b06bb792-2d80-4409-b13d-fb713922957b)

  * Download the embedConfig.json file by referring to this [link](https://help.boldbi.com/embedded-bi/site-administration/embed-settings/#get-embed-configuration-file). Please refer to the below image.
   ![EmbedConfig Properties](https://github.com/boldbi/aspnet-core-sample/assets/91586758/f2915a54-010b-45c6-b608-3817cb713dc9)

  * Copy the downloaded embedConfig.json file and place it into the following [location](https://github.com/boldbi/aspnet-core-sample/tree/master/BoldBI.Embed.Sample) of the application. Please refer to the below image.
  ![EmbedConfig image](https://github.com/boldbi/aspnet-core-sample/assets/91586758/bdb83a3e-02e4-4e99-ad57-717438e5ec5c)

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
            <td align="left">Your Bold BI application environment. (If it is cloud analytics server, use `BoldBI.Environment.Cloud`; if it is your own server, use `BoldBI.Environment.Enterprise`).</td>
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
            <td align="left">Token expiration time. (In the EmbedConfig.json file, the default token expiration time is 10000 seconds).</td>
        </tr>
    </tbody>
    </table>


 ## How to run sample
    
  1. Open Windows PowerShell in this file [location](https://github.com/boldbi/aspnet-core-sample/tree/master/BoldBI.Embed.Sample).

  2. Execute the command `dotnet restore` to restore the necessary packages. Once the packages have been restored, use the `dotnet build` command to build the project.
  
  3. Run the application using the command `dotnet run`.

 ## Developer IDE

  * Visual studio code(https://code.visualstudio.com/download)

 ## Steps to run from visual studio code
 
  * Open the ASP.NET Core sample in Visual Studio Code. 
   
  * Open the terminal in Visual Studio Code, You can restore the required dependencies by executing the following command in the terminal: `dotnet restore`.
 
  * You can build your .NET project by executing the `dotnet build` command in the terminal.
 
  * Run the application using the command `dotnet run`.

Please refer to the [help documentation](https://help.boldbi.com/embedded-bi/javascript-based/samples/v3.3.40-or-later/asp-net-core/#how-to-run-the-sample) to know how to run the sample.

## Important notes:

For security reasons, in a real world application, passwords and secrets should not be stored in config files. Instead, consider securing your credentials with an application such as Key Vault.

## Online Demos

Look at the Bold BI Embedding sample to live demo [here](https://samples.boldbi.com/embed).


## Documentation

A complete Bold BI Embedding documentation can be found on [Bold BI Embedding Help](https://help.boldbi.com/embedded-bi/javascript-based/).