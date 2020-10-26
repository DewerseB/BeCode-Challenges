<?php

// for posts
add_filter('use_block_editor_for_post', '__return_false', 10);
// for post types
add_filter('use_block_editor_for_post_type', '__return_false', 10);


function cp_link_css_stylesheet() {
    wp_enqueue_style('style', get_stylesheet_uri());
    wp_enqueue_script('script', get_template_directory_uri() . '/assets/js/home.js');
}

add_action('wp_enqueue_scripts', 'cp_link_css_stylesheet');

function cp_main_menu() {
    register_nav_menu('main-menu',__( 'Principal' ));
}

add_action( 'init', 'cp_main_menu' );