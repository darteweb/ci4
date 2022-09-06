<?php

$routes->setDefaultNamespace('\Modules\UserModule\Controllers');

$routes->get('lang/{locale}', 'Language::index');

$routes->match(['get', 'post'], 'login', 'UserController::login', ["filter" => "noauth"]);

// Admin routes
$routes->group("user", ["filter" => "auth"], function ($routes) {
	$routes->match(['get', 'post'],'readuser', 'UserController::readUser');
	
	$routes->get("dashboard", "AdminController::index");
	$routes->match(['get', 'post'], "list", "AdminController::userList");
	$routes->match(['get', 'post'], "add", "AdminController::userAdd");
	$routes->match(['get', 'post'], "edit", "AdminController::userEdit");
	$routes->match(['get', 'post'], "delete", "AdminController::userDelete");
	
	$routes->match(['get', 'post'], "roles", "AdminController::userRoleList");
});

$routes->match(['get', 'post'],'logout', 'UserController::logout');
