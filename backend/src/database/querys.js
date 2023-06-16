export const queries = {
  getSmsNumero:
    "SELECT MAX(smsnumero) as smsnumero FROM [SOLOACTIVIDAD].[dbo].SMSENTRADA where smsnumero < 999999",
  verificarUsuario:
    "select * from [AFAP_Gestion].[dbo].[INTRACOMERCIAL] where usuario = @usuario and password = @password",
  insertSmsEntrada:
    "INSERT INTO [SOLOACTIVIDAD].[dbo].[SMSENTRADA]([smsnumero], [smsrecfec], [smsrecrem], [smsrectxt], [smsestado], [smsenviado], [smstxtenvio], [smstipo], [smsarchivo]) SELECT @numero, '20210726 10:40:17.287', '', '', 'PEN', NULL, '', 5,'' ",
  insertSmsEntradaLevel1:
    "INSERT INTO [SOLOACTIVIDAD].[dbo].[SMSENTRADALEVEL1]([smsnumero], [smscedula], [smsfecnac], [smsresultado], [smscuando], [smstexto], [smsobs], [smseltipo], [smstiempo], [asesor]) VALUES (@numero, @cedula, @fecha,0,'17530101 00:00:00.000','',@asesor,5,NULL,@asesor)",
  getTotalAfiliados:
    "select count(*)Cantidad from [afapformularios].[dbo].[DATBPS] where bpsfbps > (SELECT DATEFROMPARTS(YEAR(GETDATE()), 1, 1))",
  getUltimaConsultaMontevideoPeriferia:
    "SELECT * FROM [AFAP_Gestion].[dbo].[ULTIMA_CONSULTA] where departamento = 'MONTEVIDEO' and ciudad not in ('PARQUE BATLLE' , 'MONTEVIDEO', 'POCITOS', 'CORDON' , 'BUCEO','LAS CANTERAS','TRES CRUCES', 'CIUDAD VIEJA','CENTRO', 'PUNTA CARRETAS', 'BARRIO SUR', 'PALERMO' ,'PUNTA GORDA', 'CARRASCO' , 'PARQUE RODO' ,'MALVIN','AGUADA', 'VILLA MUÑOZ')",
  getUltimaConsultaMontevideoSur:
    "SELECT * FROM [AFAP_Gestion].[dbo].[ULTIMA_CONSULTA] where departamento = 'MONTEVIDEO' and ciudad in ('PARQUE BATLLE' , 'MONTEVIDEO', 'POCITOS', 'CORDON' , 'BUCEO','LAS CANTERAS','TRES CRUCES', 'CIUDAD VIEJA','CENTRO', 'PUNTA CARRETAS', 'BARRIO SUR', 'PALERMO' ,'PUNTA GORDA', 'CARRASCO' , 'PARQUE RODO','MALVIN','AGUADA' ,'VILLA MUÑOZ')",
  getUltimaConsultaInteriorAC:
    "SELECT * FROM [AFAP_Gestion].[dbo].[ULTIMA_CONSULTA] where departamento in ('ARTIGAS','CANELONES', 'CERRO LARGO' , 'COLONIA')",
  getUltimaConsultaInteriorDR:
    "SELECT * FROM [AFAP_Gestion].[dbo].[ULTIMA_CONSULTA] where departamento in ('DURAZNO','FLORES', 'FLORIDA' , 'LAVALLEJA', 'MALDONADO' , 'PAYSANDU' , 'RIO NEGRO' , 'RIVERA', 'ROCHA')",
  getUltimaConsultaInteriorSZ:
    "SELECT * FROM [AFAP_Gestion].[dbo].[ULTIMA_CONSULTA] where departamento in ('SALTO','SAN JOSE', 'SORIANO' , 'TACUAREMBO', 'TREINTA Y TRES')",
  insertParaConsultar:
    "INSERT INTO [SOLOACTIVIDAD].[dbo].[SMSENTRADALEVEL1]([smsnumero], [smscedula], [smsfecnac], [smsresultado], [smscuando], [smstexto], [smsobs], [smseltipo], [smstiempo], [asesor]) VALUES (@numero, @cedula, @fechaN ,0,'17530101 00:00:00.000','',@asesor,5,NULL,@asesor)",
  getDatosApp: "SELECT * FROM [AFAP_Gestion].[dbo].[consultasAppWeb]",
  getAfisPorAsesor:
    "SELECT RTRIM(a.asenom) asesor, count(bpsdocu)cantidad FROM [afapformularios].[dbo].[DATBPS] as d, [afapformularios].[dbo].[ASESORES] as a where d.bpsprom = a.asenum and bpsfbps > (SELECT DATEFROMPARTS(YEAR(GETDATE()), 1, 1))group by (RTRIM(a.asenom))",
  getTotalAfiliadosAnterior:
    "select count(*)Cantidad from [afapformularios].[dbo].[DATBPS] where bpsfbps >(SELECT DATEFROMPARTS(YEAR(GETDATE())-1, 1, 1))and bpsfbps < (SELECT DATEADD(year, -1, (SELECT CONVERT(date, GETDATE()))))",
  getInfoDisponible: "SELECT * FROM [AFAP_Gestion].[dbo].[INFO_DISPONIBLE]",
  getDatosAppPorCantidad:
    "SELECT departamento as Departamento,ciudad as Ciudad, Count(cedula)Cantidad FROM [AFAP_Gestion].[dbo].[consultasAppWeb] group by departamento,ciudad",
  getPendientesConsultasComercial:
    "SELECT * FROM [AFAP_Gestion].[dbo].[PENDIENTES_CONSULTAS_COMERCIAL]",
  getAfisPorDepartamento:
    "SELECT REPLACE(departamento, ' ', '') departamento,[año],sum([cantidad])cantidad FROM [AFAP_Gestion].[dbo].[AFIS_DEPARTAMENTOS]group by [departamento] ,[año] order by departamento",
  getCantidadDeAfiliados:
    "select count(res.cantidad) as Cantidad from(select cod_cliente, count(cod_cuenta)as cantidad  from fo_cuentas where  cod_cuenta <> '0' AND fec_aprobacion_bps < TRUNC(SYSDATE)   AND (est_cuenta='A' or (fec_inactivacion >= TRUNC(SYSDATE) OR fec_inactivacion IS NULL)) group by cod_cliente)res group by res.cantidad",
  getCantAfiliadosPorAsesorActualAnterior:
    "SELECT REPLACE(a.asenom, ' ', '')asesor,[año],  sum([cantidad])cantidad FROM [AFAP_Gestion].[dbo].[AFIS_POR_ASESOR_ACTUAL_ANTERIOR] as d, [afapformularios].[dbo].[ASESORES] as a where d.asesor = a.asenum and d.asesor not in(0,1400,1370,1454,1456,3131)group by a.asenom ,[año] order by [asesor]",
  getCantPorEdadYPorSexo:
    "SELECT YEAR([fecha_ingreso]) AS [ano_ingreso],sexo, edad,COUNT(*) AS cantidad FROM [AFAP_Gestion].[dbo].[Afiliados_BPS]WHERE EDAD > 16 and EDAD < 50 and YEAR([fecha_ingreso]) > 2019 and sexo is not null GROUP BY YEAR([fecha_ingreso]), sexo, [edad]ORDER BY [ano_ingreso], [edad], [sexo]",
  getCantPorEdadYPorSexoAsesor:
    "SELECT YEAR([fecha_ingreso]) AS [ano_ingreso],asesor,sexo, edad,COUNT(*) AS cantidad FROM [AFAP_Gestion].[dbo].[Afiliados_BPS] WHERE EDAD > 16 and EDAD < 50 and YEAR([fecha_ingreso]) > 2019 and sexo is not null and asesor not in (1370,1400,1454,1456,1491,3131,3151)GROUP BY YEAR([fecha_ingreso]),asesor, sexo, [edad]ORDER BY [ano_ingreso],asesor, [edad], [sexo]",
  getCantidadPorMail:
    "SET LANGUAGE Spanish; SELECT YEAR([bpsfbps]) AS anio,DATENAME(MONTH, [bpsfbps]) AS mes, [bpsprom] AS asesor,COUNT(CASE WHEN [bpsemail] LIKE '%@%' THEN 1 END) AS si,COUNT(CASE WHEN [bpsemail] NOT LIKE '%@%' THEN 1 END) AS no,ROUND((COUNT(CASE WHEN [bpsemail] LIKE '%@%' THEN 1 END) * 1.0 / (COUNT(CASE WHEN [bpsemail] LIKE '%@%' THEN 1 END) + COUNT(CASE WHEN [bpsemail] NOT LIKE '%@%' THEN 1 END))) * 100, 0) AS porcentaje FROM [afapformularios].[dbo].[DATBPS] WHERE [bpsfbps] > '2017-01-01' AND [bpsprom] IN (1332, 1512, 1618, 2005, 3005, 3007, 3064, 3065, 3069, 3075, 3076, 3093, 3117, 3148, 3152, 3154, 3164, 3165) GROUP BY YEAR([bpsfbps]),DATENAME(MONTH, [bpsfbps]), [bpsprom]",
  getCantidadPorMailPorAnio:
    "SELECT YEAR([bpsfbps]) AS anio,bpsprom as asesor,COUNT(CASE WHEN [bpsemail] LIKE '%@%' THEN 1 END) AS si,COUNT(CASE WHEN [bpsemail] NOT LIKE '%@%' THEN 1 END) AS no,ROUND((COUNT(CASE WHEN [bpsemail] LIKE '%@%' THEN 1 END) * 1.0 / (COUNT(CASE WHEN [bpsemail] LIKE '%@%' THEN 1 END) + COUNT(CASE WHEN [bpsemail] NOT LIKE '%@%' THEN 1 END))) * 100, 0) AS porcentaje FROM [afapformularios].[dbo].[DATBPS] WHERE [bpsfbps] > '2017-01-01' AND [bpsprom] IN (1332, 1512, 1618, 2005, 3005, 3007, 3064, 3065, 3069, 3075, 3076, 3093, 3117, 3148, 3152, 3154, 3164, 3165) GROUP BY YEAR([bpsfbps]), [bpsprom]",
};
