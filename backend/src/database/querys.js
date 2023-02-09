export const queries = {
    getSmsNumero : "SELECT MAX(smsnumero) as smsnumero FROM [SOLOACTIVIDAD].[dbo].SMSENTRADA where smsnumero < 999999",
    verificarUsuario: "select * from [AFAP_Gestion].[dbo].[INTRACOMERCIAL] where usuario = @usuario and password = @password",
    insertSmsEntrada : "INSERT INTO [SOLOACTIVIDAD].[dbo].[SMSENTRADA]([smsnumero], [smsrecfec], [smsrecrem], [smsrectxt], [smsestado], [smsenviado], [smstxtenvio], [smstipo], [smsarchivo]) SELECT @numero, '20210726 10:40:17.287', '', '', 'PEN', NULL, '', 5,'' ",
    insertSmsEntradaLevel1 : "INSERT INTO [SOLOACTIVIDAD].[dbo].[SMSENTRADALEVEL1]([smsnumero], [smscedula], [smsfecnac], [smsresultado], [smscuando], [smstexto], [smsobs], [smseltipo], [smstiempo], [asesor]) VALUES (@numero, @cedula, @fecha,0,'17530101 00:00:00.000','',@asesor,5,NULL,@asesor)",
    getTotalAfiliados: "select count(*)Cantidad from [afapformularios].[dbo].[DATBPS] where bpsfbps > '01-01-2023'",
    getUltimaConsultaMontevideoPeriferia : "SELECT * FROM [AFAP_Gestion].[dbo].[ULTIMA_CONSULTA] where departamento = 'MONTEVIDEO' and ciudad not in ('PARQUE BATLLE' , 'MONTEVIDEO', 'POCITOS', 'CORDON' , 'BUCEO','LAS CANTERAS','TRES CRUCES', 'CIUDAD VIEJA','CENTRO', 'PUNTA CARRETAS', 'BARRIO SUR', 'PALERMO' ,'PUNTA GORDA', 'CARRASCO' , 'PARQUE RODO' ,'MALVIN','AGUADA', 'VILLA MUÑOZ')",
    getUltimaConsultaMontevideoSur : "SELECT * FROM [AFAP_Gestion].[dbo].[ULTIMA_CONSULTA] where departamento = 'MONTEVIDEO' and ciudad in ('PARQUE BATLLE' , 'MONTEVIDEO', 'POCITOS', 'CORDON' , 'BUCEO','LAS CANTERAS','TRES CRUCES', 'CIUDAD VIEJA','CENTRO', 'PUNTA CARRETAS', 'BARRIO SUR', 'PALERMO' ,'PUNTA GORDA', 'CARRASCO' , 'PARQUE RODO','MALVIN','AGUADA' ,'VILLA MUÑOZ')",
    getUltimaConsultaInteriorAC : "SELECT * FROM [AFAP_Gestion].[dbo].[ULTIMA_CONSULTA] where departamento in ('ARTIGAS','CANELONES', 'CERRO LARGO' , 'COLONIA')",
    getUltimaConsultaInteriorDR : "SELECT * FROM [AFAP_Gestion].[dbo].[ULTIMA_CONSULTA] where departamento in ('DURAZNO','FLORES', 'FLORIDA' , 'LAVALLEJA', 'MALDONADO' , 'PAYSANDU' , 'RIO NEGRO' , 'RIVERA', 'ROCHA')",
    getUltimaConsultaInteriorSZ : "SELECT * FROM [AFAP_Gestion].[dbo].[ULTIMA_CONSULTA] where departamento in ('SALTO','SAN JOSE', 'SORIANO' , 'TACUAREMBO', 'TREINTA Y TRES')",
    insertParaConsultar : "INSERT INTO [SOLOACTIVIDAD].[dbo].[SMSENTRADALEVEL1]([smsnumero], [smscedula], [smsfecnac], [smsresultado], [smscuando], [smstexto], [smsobs], [smseltipo], [smstiempo], [asesor]) VALUES (@numero, @cedula, @fechaN ,0,'17530101 00:00:00.000','',@asesor,5,NULL,@asesor)",
};
