package nce.majorproject.repositories.product;

import nce.majorproject.entities.Product.Product;
import nce.majorproject.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {

    @Query(value = "select p from Product p order by p.addedDate desc limit 10 ",nativeQuery = true)
    List<Product> findLatestAddedProduct();

    @Query(value="select p from Product p where p.id=?1")
    Optional<Product> validateProductById(Long id);

}
