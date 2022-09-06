<?php

function pre($pre)
{
	echo "<pre>";
	print_r($pre);
	echo "</pre>";
}

function getCurrentDate()
{
	date_default_timezone_set("Asia/Kolkata");
	return date("Y-m-d");
}

function getCurrentDateTime()
{
	date_default_timezone_set("Asia/Kolkata");
	return date("Y-m-d H:i:s");
}