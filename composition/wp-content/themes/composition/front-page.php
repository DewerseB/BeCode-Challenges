<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage Composition
 * @since Composition 1.0
 */

get_header();
    // var_dump($wp_query);
?>

<main id="site-content" role="main">

    <section class="content-column">

        <?php echo '<img class="front-image" src="' . get_field('bandeau_image_g')['url'] . '">' ?>

        <h2 class="title"><?php the_field('bandeau_titre_g') ?></h2>

        <div class="hover-content">
            <h3 class="subtitle"><?php the_field('bandeau_survol_g_titre') ?></h3>
            <p><?php the_field('bandeau_survol_g_texte') ?></p>
            <?php 
                $group = get_field('bandeau_bouton_g');

                if($group['titre']) :

                $url = $group['url'];
                $target = 'target="_blank" rel="noopener"';

                if( $group['choice'] == 'pagelink' ) {
                    $url = $group['page_link'];
                    $target = '';
                } ?>

                <a class="lien" href="<?php echo $url ?>" <?php echo $target; ?> >
                    <p><?php echo $group['titre']; ?></p>
                </a>

            <?php endif; ?>

        </div>

    </section>

    <section class="content-column">

    <?php echo '<img class="front-image" src="' . get_field('bandeau_image_d')['url'] . '"' ?>">

        <h2 class="title"><?php the_field('bandeau_titre_d') ?></h2>

        <div class="hover-content">
            <h3 class="subtitle"><?php the_field('bandeau_survol_d_titre') ?></h3>
            <p><?php the_field('bandeau_survol_d_texte') ?></p>
            <?php 
                $group = get_field('bandeau_bouton_d');

                if($group['titre']) :

                $url = $group['url'];
                $target = 'target="_blank" rel="noopener"';

                if( $group['choice'] == 'pagelink' ) {
                    $url = $group['page_link'];
                    $target = '';
                } ?>

                <a class="lien" href="<?php echo $url ?>" <?php echo $target; ?> >
                    <p><?php echo $group['titre']; ?></p>
                </a>

            <?php endif; ?>
        </div>

    </section>

</main><!-- #site-content -->


<?php
get_footer();